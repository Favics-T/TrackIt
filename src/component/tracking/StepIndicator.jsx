export default function StepIndicator({ currentStep = 1, totalSteps = 3 }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step < currentStep
                  ? 'bg-teal-600 text-white'
                  : step === currentStep
                  ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step < currentStep ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${step <= currentStep ? 'text-teal-600' : 'text-gray-400'}`}>
              {step === 1 ? 'Address' : step === 2 ? 'Review' : 'Done'}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 mb-4 mx-1 transition-colors ${
                step < currentStep ? 'bg-teal-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
