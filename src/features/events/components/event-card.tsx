import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from '../context/events-context'

interface EventCardProps {
  event: Event
  onClick?: () => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  const formattedDate = format(event.date, 'PPPP', { locale: es })

  const formatTime = (time?: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }

  const timeDisplay = event.isAllDay
    ? 'Todo el día'
    : `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`

  return (
    <Card
      className='cursor-pointer transition-shadow hover:shadow-md'
      onClick={onClick}
      style={{ borderLeft: `4px solid ${event.color || '#888'}` }}
    >
      <CardHeader className='pb-2'>
        <CardTitle className='text-base'>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className='pb-3'>
        <div className='text-muted-foreground text-sm'>
          <div>{formattedDate}</div>
          <div>{timeDisplay}</div>
          {event.location && <div>{event.location}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
