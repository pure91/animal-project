"use client";
import React from "react";

interface InstagramShareModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function InstagramShareModal({ onClose, onConfirm }: InstagramShareModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-title">
                    📷 인스타그램 공유
                </h2>
                <p className="modal-text">
                    복사된 텍스트와 이미지를 인스타그램 게시물에 공유하세요!
                </p>
                <div className="modal-buttons">
                    <button onClick={onClose} className="modal-btn cancel">취소</button>
                    <button onClick={onConfirm} className="modal-btn confirm">인스타그램 열기</button>
                </div>
            </div>
        </div>
    )
}