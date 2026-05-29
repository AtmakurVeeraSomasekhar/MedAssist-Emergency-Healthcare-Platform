package com.emergencyapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.emergencyapp.model.ChatMessage;

public interface ChatRepository
        extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findByRoomId(
            String roomId
    );
}