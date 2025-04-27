import { createContext, useContext, useState, ReactNode } from 'react'
import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  color: z.string().optional(),
  isAllDay: z.boolean().optional().default(false),
})

export type Event = z.infer<typeof eventSchema>

interface EventsContextType {
  events: Event[]
  selectedEvent: Event | null
  isCreateDialogOpen: boolean
  isUpdateDialogOpen: boolean
  isDeleteDialogOpen: boolean
  setEvents: (events: Event[]) => void
  setSelectedEvent: (event: Event | null) => void
  setIsCreateDialogOpen: (isOpen: boolean) => void
  setIsUpdateDialogOpen: (isOpen: boolean) => void
  setIsDeleteDialogOpen: (isOpen: boolean) => void
  addEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export const useEvents = () => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return context
}

interface EventsProviderProps {
  children: ReactNode
}

export default function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    )
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        selectedEvent,
        isCreateDialogOpen,
        isUpdateDialogOpen,
        isDeleteDialogOpen,
        setEvents,
        setSelectedEvent,
        setIsCreateDialogOpen,
        setIsUpdateDialogOpen,
        setIsDeleteDialogOpen,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
