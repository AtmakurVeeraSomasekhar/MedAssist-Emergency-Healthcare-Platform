package com.emergencyapp.service;

import com.emergencyapp.model.ChatMessage;

import com.emergencyapp.repository.ChatRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service

public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public ChatMessage saveMessage(
            ChatMessage message
    ) {

        message.setTimestamp(new Date());

        return chatRepository.save(message);
    }

    public List<ChatMessage> getRoomMessages(
            String roomId
    ) {

        return chatRepository.findByRoomId(
                roomId
        );
    }
}