package com.emergencyapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class VideoCallController {

    @MessageMapping("/video-signal")
    @SendTo("/topic/video-signal")
    public Map<String, Object> sendSignal(
            Map<String, Object> signal
    ) {
        return signal;
    }
}