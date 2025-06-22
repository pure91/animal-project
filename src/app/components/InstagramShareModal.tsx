"use client";
import React from "react";

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
                <h2 className="modal-title">📷 인스타그램 공유 안내</h2>
                {isIOS() ? (
                    <>
                        <p className="modal-text">
                            1️⃣ 아래 이미지를 꾹 눌러서 저장<br/>2️⃣ 인스타그램을 열고 피드에 이미지 등록<br/>3️⃣ 현재 복사되어 있는 텍스트를 내용에 붙여넣기
                        </p>
                        <div className="modal-image-wrapper" style={{textAlign: 'center'}}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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