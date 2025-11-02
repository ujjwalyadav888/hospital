import { Message } from "../models/messageScema.js";

export const messageSend = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "No request body received"
            });
        }

        const {firstName, lastName, email, phone, message} = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
                missing: {
                    firstName: !firstName,
                    lastName: !lastName,
                    email: !email,
                    phone: !phone,
                    message: !message
                }
            });
        }

        const newMessage = await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.error('Message controller error:', error);
        res.status(500).json({
            success: false,
            message: "Error processing message",
            error: error.message
        });
    }
}