package com.emergencyapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessage {

    @Id
    private String id;

    private String roomId;

    private String senderId;

    private String receiverId;

    private String senderRole;

    private String message;

    private String messageType;

    private String fileUrl;

    private Boolean seen = false;

    private Date timestamp;
}