import Step1Intro from '../../components/Volunteer/Step1Intro';
import Step2Quiz from '../../components/Volunteer/Step2Quiz';
import Step3Result from '../../components/Volunteer/Step3Result';
import Step4Submitted from '../../components/Volunteer/Step4Submitted';

export default function JoinModal({
  isOpen,
  onClose,
  currentStep,
  camp,
  org,
  agreementChecked,
  setAgreementChecked,
  onStartQuiz,
  questions,
  currentQuestionIndex,
  userAnswers,
  quizTimer,
  isSubmitting,
  onSelectOption,
  onPrevQuestion,
  onNextQuestion,
  submissionResult,
  onResultAction,
  applicationDetails
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto">
        {currentStep === 1 && (
          <Step1Intro
            camp={camp}
            org={org}
            agreementChecked={agreementChecked}
            setAgreementChecked={setAgreementChecked}
            onStartQuiz={onStartQuiz}
            onClose={onClose}
          />
        )}

        {currentStep === 2 && (
          <Step2Quiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            quizTimer={quizTimer}
            isSubmitting={isSubmitting}
            onSelectOption={onSelectOption}
            onPrevQuestion={onPrevQuestion}
            onNextQuestion={onNextQuestion}
            onClose={onClose}
          />
        )}

        {currentStep === 3 && (
          <Step3Result
            submissionResult={submissionResult}
            onResultAction={onResultAction}
            onClose={onClose}
          />
        )}

        {currentStep === 4 && (
          <Step4Submitted
            applicationDetails={applicationDetails}
            camp={camp}
            org={org}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}