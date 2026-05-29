package com.emergencyapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;

import org.springframework.messaging.handler.annotation.Payload;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(
            SimpMessagingTemplate messagingTemplate
    ) {
        this.messagingTemplate =
                messagingTemplate;
    }

    @MessageMapping("/ambulance-status")
    public void ambulanceStatusUpdate(
            @Payload Map<String, Object> data
    ) {
        messagingTemplate.convertAndSend(
                "/topic/messages",
                data
        );
    }

    @MessageMapping("/driver-location")
    public void driverLocationUpdate(
            @Payload Map<String, Object> data
    ) {
        messagingTemplate.convertAndSend(
                "/topic/notifications",
                data
        );
    }
}