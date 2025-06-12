"use client";
import React from "react";
import Image from "next/image";

interface InstagramShareModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isIOS: () => boolean;
    imageUrl: string;
}

export default function InstagramShareModal({onClose, onConfirm, isIOS, imageUrl}: InstagramShareModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-title">📷 인스타그램 공유</h2>
                {isIOS() ? (
                    <>
                        <p className="modal-text">
                            👇 이미지를 꾹 눌러 저장하고, 인스타그램 열기를 통해 복사된 텍스트를 게시물에 붙여 넣어 주세요!
                        </p>
                        <div className="modal-image-wrapper" style={{textAlign: 'center'}}>
                            <img
                                src={imageUrl}
                                alt="아이폰 공유 이미지"
                                style={{width: "100%", maxWidth: "300px", borderRadius: "1rem"}}
                            />
                        </div>
                    </>
                ) : (
                    <p className="modal-text">인스타그램 열기를 통해 저장되는 이미지와 복사된 텍스트를 게시물에 붙여 넣어 공유하세요!</p>
                )}

                <div className="modal-buttons">
                    <button onClick={onClose} className="modal-btn cancel">취소</button>
                    <button onClick={onConfirm} className="modal-btn confirm">인스타그램 열기</button>
                </div>
            </div>
        </div>
    )
}