import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (

    onMessageReceived,
    onConnected,
    onTypingReceived,
    onNotificationReceived

) => {

    const socket =
        new SockJS(
            "http://localhost:8080/chat"
        );

    stompClient = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        debug: (str) => {
            console.log(str);
        },

        onConnect: () => {

            console.log(
                "WebSocket Connected"
            );

            if (onConnected) {
                onConnected();
            }

            /*
            =========================
            CHAT MESSAGES
            =========================
            */

            stompClient.subscribe(

                "/topic/messages",

                (message) => {

                    const receivedMessage =
                        JSON.parse(
                            message.body
                        );

                    console.log(
                        "Received Message:",
                        receivedMessage
                    );

                    if (onMessageReceived) {

                        onMessageReceived(
                            receivedMessage
                        );
                    }
                }
            );

            /*
            =========================
            TYPING STATUS
            =========================
            */

            stompClient.subscribe(

                "/topic/typing",

                (message) => {

                    const typingData =
                        JSON.parse(
                            message.body
                        );

                    console.log(
                        "Typing:",
                        typingData
                    );

                    if (onTypingReceived) {

                        onTypingReceived(
                            typingData
                        );
                    }
                }
            );

            /*
            =========================
            REALTIME NOTIFICATIONS
            =========================
            */

            stompClient.subscribe(

                "/topic/notifications",

                (message) => {

                    const notification =
                        JSON.parse(
                            message.body
                        );

                    console.log(
                        "Notification:",
                        notification
                    );

                    if (
                        onNotificationReceived
                    ) {

                        onNotificationReceived(
                            notification
                        );
                    }
                }
            );
        },

        onStompError: (frame) => {

            console.error(
                "Broker Error:",
                frame
            );
        }
    });

    stompClient.activate();
};

/*
=========================
SEND CHAT MESSAGE
=========================
*/

export const sendMessage = (

    message

) => {

    if (

        stompClient &&
        stompClient.connected

    ) {

        stompClient.publish({

            destination: "/app/chat",

            body: JSON.stringify(
                message
            )
        });

        console.log(
            "Message Sent:",
            message
        );

    } else {

        console.log(
            "WebSocket not connected"
        );
    }
};

/*
=========================
DISCONNECT SOCKET
=========================
*/

export const disconnectSocket = () => {

    if (stompClient) {

        stompClient.deactivate();
    }
};

/*
=========================
SEND TYPING STATUS
=========================
*/

export const sendTypingStatus = (

    typingData

) => {

    if (

        stompClient &&
        stompClient.connected

    ) {

        stompClient.publish({

            destination: "/app/typing",

            body: JSON.stringify(
                typingData
            )
        });
    }
};

/*
=========================
SEND REALTIME NOTIFICATION
=========================
*/

export const sendNotification = (

    notificationData

) => {

    if (

        stompClient &&
        stompClient.connected

    ) {

        stompClient.publish({

            destination: "/app/notify",

            body: JSON.stringify(
                notificationData
            )
        });

        console.log(
            "Notification Sent:",
            notificationData
        );
    }
};