package com.emergencyapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;

import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RestController;

import com.emergencyapp.model.ChatMessage;

import com.emergencyapp.repository.ChatRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    /* =========================
       SEND MESSAGE
    ========================= */

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage send(
            ChatMessage message
    ) {

        message.setTimestamp(
                new java.util.Date()
        );

        message.setSeen(false);

        if (message.getMessageType() == null) {
            message.setMessageType("TEXT");
        }

        chatRepository.save(message);

        return message;
    }

    /* =========================
       TYPING STATUS
    ========================= */

    @MessageMapping("/typing")
    @SendTo("/topic/typing")
    public ChatMessage typingStatus(
            ChatMessage message
    ) {
        return message;
    }

    /* =========================
       GET CHAT HISTORY
    ========================= */

    @GetMapping("/chat/{roomId}")
    public List<ChatMessage> getChatHistory(
            @PathVariable String roomId
    ) {

        return chatRepository.findByRoomId(
                roomId
        );
    }

    /* =========================
       SEEN STATUS
    ========================= */

    @PutMapping("/chat/seen/{roomId}/{receiverId}")
    public String markMessagesSeen(
            @PathVariable String roomId,
            @PathVariable String receiverId
    ) {

        List<ChatMessage> messages =
                chatRepository.findByRoomId(
                        roomId
                );

        for (ChatMessage msg : messages) {

            if (
                    receiverId.equals(
                            msg.getReceiverId()
                    )
            ) {

                msg.setSeen(true);

                chatRepository.save(msg);
            }
        }

        return "Messages marked as seen";
    }
}