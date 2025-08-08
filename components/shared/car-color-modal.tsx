"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Color {
    name: string
    code: string
    image: string
}

interface CarColorModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    carName: string
    selectedColor: Color
    colors: Color[]
    onColorSelect: (color: Color) => void
    currentStep: number
    totalSteps: number
}

export function CarColorModal({
    isOpen,
    onOpenChange,
    carName,
    selectedColor,
    colors,
    onColorSelect,
    currentStep,
    totalSteps,
}: CarColorModalProps) {
    // Color navigation functions
    const currentColorIndex = colors.findIndex(color => color.name === selectedColor.name)
    const canGoPrev = currentColorIndex > 0
    const canGoNext = currentColorIndex < colors.length - 1

    const handlePrevColor = () => {
        if (canGoPrev) {
            onColorSelect(colors[currentColorIndex - 1])
        }
    }

    const handleNextColor = () => {
        if (canGoNext) {
            onColorSelect(colors[currentColorIndex + 1])
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-screen h-screen max-w-full max-h-full bg-white p-0 m-0 flex flex-col">
                <DialogHeader className="flex-shrink-0 p-4 border-b border-honda-gray-light relative">
                    <DialogTitle className="text-2xl font-bold text-honda-gray-dark text-left pl-4">
                        {carName}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Color selection modal for {carName}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-y-auto">
                    {/* Car Image - Smaller Size (60% of previous) */}
                    <div className="relative w-full max-w-sm aspect-[16/10] mb-8">
                        <Image
                            src={selectedColor.image || "/placeholder.svg"}
                            alt={`${carName} - ${selectedColor.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                        />
                    </div>

                    {/* Stepper - Wider Layout */}
                    <div className="relative flex justify-between items-center w-full max-w-2xl mb-8">
                        {Array.from({ length: totalSteps }, (_, i) => {
                            const step = i + 1
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center z-10">
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center font-semibold border",
                                                "bg-white text-honda-gray-dark border-honda-red-primary",
                                                step === currentStep && "bg-honda-red-primary text-white",
                                            )}
                                        >
                                            {step}
                                        </div>
                                        <span
                                            className={cn(
                                                "text-xs mt-1",
                                                step === currentStep ? "text-honda-red-primary font-semibold" : "text-honda-gray",
                                            )}
                                        >
                                            {step === 1 && "COLOR"}
                                            {step === 2 && "MAINTENANCE"}
                                            {step === 3 && "ACCESSORIES"}
                                            {step === 4 && "FINISH"}
                                        </span>
                                    </div>
                                    {i < totalSteps - 1 && (
                                        <div className="flex-grow border-t border-dashed border-honda-red-primary mx-6" />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>

                    {/* Color Swatches - Fixed Border */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => onColorSelect(color)}
                                className={`w-12 h-12 rounded-full border transition-all duration-200 ${selectedColor.name === color.name
                                    ? "border-honda-red-primary scale-110"
                                    : "border-gray-300 hover:border-honda-red-light"
                                    }`}
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                            />
                        ))}
                    </div>
                    <p className="text-honda-gray-dark font-medium text-lg mb-8">{selectedColor.name}</p>

                    {/* Navigation Buttons - Wider Layout */}
                    <div className="flex justify-between w-full max-w-2xl mb-8">
                        <Button
                            onClick={handlePrevColor}
                            variant="outline"
                            className="flex items-center gap-2 bg-transparent text-honda-gray-dark border-honda-gray-light hover:bg-honda-light"
                            disabled={!canGoPrev}
                        >
                            PREV
                        </Button>
                        <Button
                            onClick={handleNextColor}
                            variant="destructive"
                            className="flex items-center gap-2 bg-honda-red-primary hover:bg-honda-red-dark"
                            disabled={!canGoNext}
                        >
                            NEXT <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Detail Section - Much Wider Layout */}
                    <div className="w-full max-w-3xl border-t border-honda-gray-light pt-6">
                        <h3 className="text-xl font-bold text-honda-red-primary mb-4">DETAIL</h3>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-honda-gray-dark">
                            <span className="font-medium">Variant</span>
                            <span>{carName}</span>
                            <span className="font-medium">Color</span>
                            <span className="flex items-center gap-2">
                                {selectedColor.name}
                                <span
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: selectedColor.code }}
                                ></span>
                            </span>
                            <span className="font-medium">Maintenance</span>
                            <span>—</span>
                            <span className="font-medium">Accessories</span>
                            <span>—</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}