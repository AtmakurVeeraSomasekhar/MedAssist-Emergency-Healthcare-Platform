package com.emergencyapp.controller;

import com.emergencyapp.model.NotificationMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public NotificationMessage sendNotification(
            NotificationMessage notification
    ) {
        return notification;
    }
}