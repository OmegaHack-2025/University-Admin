import { format, isFuture, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEvents } from '../context/events-context'
import { EventCard } from './event-card'

export function EventsList() {
  const { events, setSelectedEvent, setIsUpdateDialogOpen } = useEvents()

  // Filtrar eventos futuros
  const upcomingEvents = events
    .filter((event) => isFuture(event.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Agrupar eventos por fecha
  const eventsByDate = upcomingEvents.reduce<Record<string, typeof events>>(
    (acc, event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd')
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(event)
      return acc
    },
    {}
  )

  // Convertir a array ordenado por fecha
  const groupedEvents = Object.entries(eventsByDate)
    .map(([dateStr, events]) => ({
      date: parseISO(dateStr),
      events,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const handleEventClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event)
    setIsUpdateDialogOpen(true)
  }

  return (
    <ScrollArea className='h-[500px] pr-4'>
      <div className='space-y-8 pb-4'>
        {groupedEvents.length > 0 ? (
          groupedEvents.map((group) => (
            <div key={format(group.date, 'yyyy-MM-dd')} className='space-y-2'>
              <h3 className='bg-background sticky top-0 z-10 py-1 text-sm font-medium'>
                {format(group.date, 'PPPP', { locale: es })}
              </h3>
              <div className='space-y-2'>
                {group.events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            No hay eventos próximos programados
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
