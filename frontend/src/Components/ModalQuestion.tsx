type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    modalTitle?: string;
    modalDescription?: string;
    buttonTrueText?: string;
    bgColor?: string;
    textColor?: string;
    buttonTrueColor?: string;
};

export default function ModalQuestion({isOpen, onClose, onSubmit,
                                          modalDescription = "",
                                          modalTitle = "Neues Element",
                                          buttonTrueText = "Bestätigen",
                                          bgColor = "bg-gray-400",
                                          textColor = "text-white",
                                          buttonTrueColor = "deleteColor",
                                      }: Readonly<ModalProps>) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className={`${bgColor} ${textColor} p-6 rounded-xl shadow-lg`}>
                <h2 className={`text-lg font-bold mb-4 ${textColor}`}>{modalTitle}</h2>
                <p className={`mb-6 font-bold ${textColor}`}>{modalDescription}</p>
                <div className="mt-6 flex justify-end gap-24">
                    <button onClick={onClose} className="stdButton stdColor">
                        Abbruch
                    </button>
                    <button onClick={onSubmit} className={`stdButton ${buttonTrueColor}`}>
                        {buttonTrueText}
                    </button>
                </div>
            </div>
        </div>
    );
}