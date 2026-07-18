import { useState, useRef } from 'react'
import uploadIcon from '../../../images/Icons/upload.png'
const OrgStepThree = ({ formData, setFormData, onNext, loading, apiError }) => {
    const MAX_FILES = 6
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)

    const files = formData.documents || []
    const addFiles = (newFiles) => {
        const remaining = MAX_FILES - files.length
        if (remaining <= 0) {
            setError(`You can upload up to ${MAX_FILES} files only`)
            return
        }
        const toAdd = Array.from(newFiles).slice(0, remaining)
        setFormData({ ...formData, documents: [...files, ...toAdd] })
        setError('')
    }
    const removeFile = (index) => {
        setFormData({
            ...formData,
            documents: files.filter((_, i) => i !== index)
        })
        setError('')
    }
    // دالة الـ input
    const handleFileSelect = (e) => {
        if (e.target.files?.length) addFiles(e.target.files)
        e.target.value = ''
    }

    // دالة الـ drop
    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
    }
    const handleSubmit = () => {
        if (files.length === 0) {
            setError('Please upload at least one document')
            return
        }
        onNext()
    }
    return (
        <div className="flex flex-col items-center   h-full justify-between">
            {/* العنوان */}
            <h1 className="text-[35px] font-medium font-poppins text-[#0A3A45] mb-2 text-center">
                Upload Verification Documents
            </h1>
            <p className="text-[14px] text-[#5C6B73] font-poppins mb-8 text-center">
                Please upload official documents to verify your organization.
            </p>
            {/* مربع الرفع */}
            {files.length === 0 && (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false) }}
                    className={`flex flex-col items-center justify-center gap-2 p-6 rounded-[12px] border-2 border-dashed cursor-pointer transition-colors w-[220px] mb-8
                    ${isDragging ? 'border-[#0A3A45] bg-[#0A3A45]/5' : 'border-[#C9D4D8] bg-[#D9D9D9]'}`}
                >
                    <p className="text-[13px] font-outfit text-[#0A3A45] text-center leading-tight">
                        Drag & drop your documents <br /> or click to upload
                    </p>
                    <img src={uploadIcon} alt="upload" className="w-10 h-10 object-contain" />
                    <p className="text-[11px] font-outfit text-[#5C6B73]">PDF , JPG , PNG , URL</p>
                </div>
            )}
            {/* input مخفي */}
            <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
            />
            {/* الشبكة - تظهر بس لما في ملفات */}
            {files.length > 0 && (
                <div className="w-full grid grid-cols-3 grid-rows-2 gap-3 mb-8">

                    {/* العمود الأيسر - 3 خانات */}
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-[64px] rounded-[12px] bg-[#D9D9D9] flex items-center px-3">
                            {files[i] ? (
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-[12px] font-outfit text-[#0A3A45] truncate">{files[i].name}</p>
                                    <button onClick={() => removeFile(i)} className="text-[#5C6B73] hover:text-[#EE1D52] ml-2">✕</button>
                                </div>
                            ) : null}
                        </div>
                    ))}

                    {/* المربع الأوسط - ثابت يمتد صفين */}
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`row-span-2 flex flex-col items-center justify-center gap-2 p-4 rounded-[12px] border-2 border-dashed cursor-pointer transition-colors
                            ${isDragging ? 'border-[#0A3A45] bg-[#0A3A45]/5' : 'border-[#C9D4D8] bg-[#D9D9D9]'}`}
                    >
                        <p className="text-[13px] font-outfit text-[#0A3A45] text-center leading-tight">
                            Drag & drop your documents <br /> or click to upload
                        </p>
                        <img src={uploadIcon} alt="upload" className="w-10 h-10 object-contain" />
                        <p className="text-[11px] font-outfit text-[#5C6B73]">PDF , JPG , PNG , URL</p>
                    </div>

                    {/* العمود الأيمن - 3 خانات */}
                    {[3, 4, 5].map((i) => (
                        <div key={i} className="h-[64px] rounded-[12px] bg-[#D9D9D9] flex items-center px-3">
                            {files[i] ? (
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-[12px] font-outfit text-[#0A3A45] truncate">{files[i].name}</p>
                                    <button onClick={() => removeFile(i)} className="text-[#5C6B73] hover:text-[#EE1D52] ml-2">✕</button>
                                </div>
                            ) : null}
                        </div>
                    ))}

                </div>
            )}

            {error && <p className="text-red-500 text-[12px] mb-4">{error}</p>}
            {apiError && <p className="text-red-500 text-[12px] mb-4">{apiError}</p>}
            {/* Submit */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-[600px] py-4 bg-[#0A3A45] text-[#F7F9FA] text-[16px] font-semibold font-inter rounded-[16px] hover:opacity-90 transition-opacity mb-4"
            >
                Submit
            </button>

            {/* Terms */}
            <p className="text-[12px] text-[#06272F] font-outfit text-center">
                By creating an account, you agree to our{' '}
                <span className="text-[#FFC107] cursor-pointer underline">Terms of use</span>
                {' '}and{' '}
                <span className="text-[#FFC107] cursor-pointer underline">Privacy Policy</span>
            </p>

        </div>
    )
}

export default OrgStepThree