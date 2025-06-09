import React, { useState, useEffect } from "react";
import { fetchProductReviews } from "@/services/api/products";
import { getSocket, closeSocket } from "@/services/sockets";


const useProductReview = (initialReviewData, productId) => {
    const wsUrl = `ws://localhost:8001/ws/reviews/${productId}`;
    const socketKey = `reviews_${productId}`;

    const [productReview, setProductReview] = useState(initialReviewData);

    useEffect(() => {
        if (!productId) return;

        async function loadReviews() {
            const response = await fetchProductReviews({ productId });
            if (response.data) setProductReview(response.data);
            else console.error("Failed to fetch reviews", response.error);
        }
        loadReviews();
    }, [productId]);

    useEffect(() => {
        if (!productId) return;

        const ws = getSocket(wsUrl, socketKey);

        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case "newComment":
                    setProductReview((prev) => ({
                        ...prev,
                        totalcomments: prev.totalcomments + 1,
                        comments: [...prev.comments, message.data],
                    }));
                break;
                case "newReply":
                    setProductReview((prev) => ({
                        ...prev,
                        comments: prev.comments.map((c) =>
                        c.id === message.data.commentId
                            ? { ...c, replies: [...c.replies, message.data.reply] }
                            : c
                        ),
                    }));
                break;
                case "editComment":
                    setProductReview((prev) => ({
                        ...prev,
                        comments: prev.comments.map((c) =>
                        c.id === message.data.id ? message.data : c
                        ),
                    }));
                break;
                case "deleteComment":
                    setProductReview((prev) => ({
                        ...prev,
                        totalcomments: prev.totalcomments - 1,
                        comments: prev.comments.filter((c) => c.id !== message.data.commentId),
                    }));
                break;
                default:
                console.warn("Unknown message type", message.type);
            }
        };

        ws.addEventListener("message", handleMessage);

        return () => {
            ws.removeEventListener("message", handleMessage);
        };
    }, [productId,wsUrl, socketKey]);

    return { productReview, setProductReview };
};

export default useProductReview;
