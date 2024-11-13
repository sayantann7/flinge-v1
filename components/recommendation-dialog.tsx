"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getMovieSuggestions } from "@/lib/gemini"
import { searchMovies } from "@/lib/tmdb"
import { MovieCard } from "./movie-card"
import { toast } from "sonner"

const QUESTIONS = [
  {
    id: "mood",
    question: "What's your current mood?",
    options: ["Happy", "Thoughtful", "Excited", "Relaxed", "Emotional", "Adventurous"],
  },
  {
    id: "genre",
    question: "What genre interests you right now?",
    options: ["Action", "Drama", "Comedy", "Sci-Fi", "Romance", "Thriller", "Fantasy", "Mystery"],
  },
  {
    id: "era",
    question: "Which era of movies do you prefer?",
    options: ["Classic (Pre-1980)", "Retro (1980-2000)", "Modern (2000-2015)", "Contemporary (2015-Present)"],
  },
  {
    id: "pacing",
    question: "What kind of pacing do you enjoy?",
    options: ["Fast & Action-Packed", "Moderate & Balanced", "Slow & Contemplative"],
  },
  {
    id: "complexity",
    question: "How complex should the plot be?",
    options: ["Simple & Straightforward", "Moderately Complex", "Complex & Thought-Provoking", "Mind-Bending"],
  },
  {
    id: "tone",
    question: "What tone are you in the mood for?",
    options: ["Light & Fun", "Dark & Gritty", "Inspirational", "Suspenseful", "Emotional & Moving"],
  },
  {
    id: "language",
    question: "Are you open to foreign language films?",
    options: ["English Only", "Don't Mind Subtitles", "Prefer Foreign Films"],
  },
]

export function RecommendationDialog() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const currentQuestion = QUESTIONS[step]
  const progress = ((step + 1) / QUESTIONS.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.question]: answer
    }))
    
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1)
    } else {
      handleGetRecommendations()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1)
    }
  }

  const handleGetRecommendations = async () => {
    setLoading(true)
    try {
      const movieTitles = await getMovieSuggestions(answers)
      
      const searchResults = await Promise.all(
        movieTitles.map(title => searchMovies(title))
      )
      
      const movies = searchResults
        .map(results => results.find(movie => movie?.poster_path))
        .filter(Boolean)
        .slice(0, 4)
      
      if (movies.length === 0) {
        throw new Error('No movies found')
      }
      
      setRecommendations(movies)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      toast.error('Could not get recommendations. Please try again.')
      handleReset()
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({})
    setRecommendations([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
          Get Personalized Recommendations
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {recommendations.length > 0 
              ? "Your Personalized Recommendations"
              : "Let's Find Your Perfect Movie"}
          </DialogTitle>
          <DialogDescription>
            {recommendations.length > 0 
              ? "Based on your preferences, we think you'll love these movies:"
              : "Answer a few questions to get personalized movie recommendations."}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Finding perfect movies for you...</span>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id.toString()}
                title={movie.title}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                year={movie.release_date?.split('-')[0] || ''}
                className="w-full"
              />
            ))}
          </div>
        ) : (
          <div className="py-4">
            <div className="h-2 bg-secondary rounded-full mb-6">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <h3 className="font-medium mb-4">
              Question {step + 1} of {QUESTIONS.length}:
              <br />
              {currentQuestion.question}
            </h3>
            
            <RadioGroup onValueChange={handleAnswer} className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            {step > 0 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mt-4"
              >
                Back
              </Button>
            )}
          </div>
        )}

        <DialogFooter>
          {recommendations.length > 0 && (
            <Button onClick={handleReset} className="w-full sm:w-auto">
              Get More Recommendations
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}