"use client";
import React from "react";

interface InstagramShareModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isIOS: () => boolean;
}

export default function InstagramShareModal({onClose, onConfirm, isIOS}: InstagramShareModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-title">
                    📷 인스타그램 공유
                </h2>
                <div className="modal-text">
                    <p>복사된 텍스트와 이미지를 인스타그램 게시물에 공유하세요!</p>
                    <p>
                        {isIOS()
                            ? "💡 열기 버튼 클릭 시 나오는 이미지를 저장해주세요."
                            : "💡 열기 버튼 클릭 시 이미지가 저장됩니다."}
                    </p>
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose} className="modal-btn cancel">취소</button>
                    <button onClick={onConfirm} className="modal-btn confirm">인스타그램 열기</button>
                </div>
            </div>
        </div>
    )
}