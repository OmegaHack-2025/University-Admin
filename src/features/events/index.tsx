import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { EventsDialogs } from './components/events-dialogs'
import { EventsList } from './components/events-list'
import { EventsPrimaryButtons } from './components/events-primary-buttons'
import EventsProvider, { useEvents } from './context/events-context'
import { events as sampleEvents } from './data/events'

function EventsContent() {
  const { events, setEvents, setSelectedEvent, setIsUpdateDialogOpen } =
    useEvents()
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Inicializar los eventos con los datos de muestra cuando se monta el componente
  useEffect(() => {
    if (events.length === 0) {
      setEvents(sampleEvents)
    }
  }, [events.length, setEvents])

  // Obtener los eventos para la fecha seleccionada
  const selectedDateEvents = events.filter((event) => {
    if (!date) return false
    const eventDate = event.date
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    )
  })

  const handleDayClick = (date: Date | undefined) => {
    setDate(date)
  }

  const handleEventClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event)
    setIsUpdateDialogOpen(true)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Eventos</h2>
            <p className='text-muted-foreground'>
              Administra los eventos del calendario académico
            </p>
          </div>
          <EventsPrimaryButtons />
        </div>

        <Tabs defaultValue='calendar' className='mt-6'>
          <TabsList className='mb-4'>
            <TabsTrigger value='calendar'>Calendario</TabsTrigger>
            <TabsTrigger value='list'>Lista</TabsTrigger>
          </TabsList>

          <TabsContent value='calendar' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-7 lg:grid-cols-7'>
              <div className='md:col-span-4 lg:col-span-5'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={handleDayClick}
                  className='rounded-md border p-3'
                />
              </div>

              <Card className='md:col-span-3 lg:col-span-2'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-base'>
                    {date ? format(date, 'PPP') : 'Eventos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {selectedDateEvents.length > 0 ? (
                      selectedDateEvents.map((event) => (
                        <div
                          key={event.id}
                          className='hover:bg-accent flex cursor-pointer items-start justify-between rounded-sm border-l-4 px-3 py-2 transition-colors'
                          style={{ borderLeftColor: event.color || '#888' }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div>
                            <div className='font-medium'>{event.title}</div>
                            <div className='text-muted-foreground text-sm'>
                              {event.isAllDay
                                ? 'Todo el día'
                                : `${event.startTime} - ${event.endTime}`}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='text-muted-foreground py-4 text-center'>
                        No hay eventos para esta fecha
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='list'>
            <EventsList />
          </TabsContent>
        </Tabs>
      </Main>

      <EventsDialogs />
    </>
  )
}

export default function Events() {
  return (
    <EventsProvider>
      <EventsContent />
    </EventsProvider>
  )
}
