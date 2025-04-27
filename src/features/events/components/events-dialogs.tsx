import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useEvents } from '../context/events-context'

const colorOptions = [
  { value: '#4CAF50', label: 'Verde' },
  { value: '#F44336', label: 'Rojo' },
  { value: '#2196F3', label: 'Azul' },
  { value: '#FF9800', label: 'Naranja' },
  { value: '#9C27B0', label: 'Púrpura' },
  { value: '#795548', label: 'Marrón' },
  { value: '#607D8B', label: 'Gris Azulado' },
]

export function EventsDialogs() {
  return (
    <>
      <CreateEventDialog />
      <UpdateEventDialog />
      <DeleteEventDialog />
    </>
  )
}

function CreateEventDialog() {
  const { isCreateDialogOpen, setIsCreateDialogOpen, addEvent } = useEvents()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [location, setLocation] = useState('')
  const [isAllDay, setIsAllDay] = useState(false)
  const [color, setColor] = useState('#4CAF50')

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDate(new Date())
    setStartTime('09:00')
    setEndTime('10:00')
    setLocation('')
    setIsAllDay(false)
    setColor('#4CAF50')
  }

  const handleClose = () => {
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date) return

    addEvent({
      title,
      description,
      date,
      startTime: isAllDay ? undefined : startTime,
      endTime: isAllDay ? undefined : endTime,
      location,
      isAllDay,
      color,
    })

    handleClose()
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit} className='pt-6'>
          <DialogHeader>
            <DialogTitle>Crear evento</DialogTitle>
            <DialogDescription>
              Completa la información para crear un nuevo evento.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='title' className='text-right'>
                Título
              </Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='col-span-3'
                required
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Descripción
              </Label>
              <Textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Fecha</Label>
              <div className='col-span-3'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  className='rounded-md border'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='text-right'>
                <Label htmlFor='isAllDay'>Todo el día</Label>
              </div>
              <Switch
                id='isAllDay'
                checked={isAllDay}
                onCheckedChange={setIsAllDay}
              />
            </div>
            {!isAllDay && (
              <>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='startTime' className='text-right'>
                    Hora inicio
                  </Label>
                  <Input
                    id='startTime'
                    type='time'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='endTime' className='text-right'>
                    Hora fin
                  </Label>
                  <Input
                    id='endTime'
                    type='time'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className='col-span-3'
                  />
                </div>
              </>
            )}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='location' className='text-right'>
                Ubicación
              </Label>
              <Input
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='color' className='text-right'>
                Color
              </Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Selecciona un color' />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className='flex items-center gap-2'>
                        <div
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: option.value }}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleClose}>
              Cancelar
            </Button>
            <Button type='submit'>Crear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UpdateEventDialog() {
  const {
    selectedEvent,
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    updateEvent,
  } = useEvents()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [isAllDay, setIsAllDay] = useState(false)
  const [color, setColor] = useState('')

  // Actualizar el formulario cuando se selecciona un evento
  useState(() => {
    if (selectedEvent && isUpdateDialogOpen) {
      setTitle(selectedEvent.title)
      setDescription(selectedEvent.description || '')
      setDate(selectedEvent.date)
      setStartTime(selectedEvent.startTime || '')
      setEndTime(selectedEvent.endTime || '')
      setLocation(selectedEvent.location || '')
      setIsAllDay(selectedEvent.isAllDay || false)
      setColor(selectedEvent.color || '#4CAF50')
    }
  })

  const handleClose = () => {
    setIsUpdateDialogOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent || !title || !date) return

    updateEvent(selectedEvent.id, {
      title,
      description,
      date,
      startTime: isAllDay ? undefined : startTime,
      endTime: isAllDay ? undefined : endTime,
      location,
      isAllDay,
      color,
    })

    handleClose()
  }

  if (!selectedEvent) return null

  return (
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Actualizar evento</DialogTitle>
            <DialogDescription>
              Modifica la información del evento.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='title' className='text-right'>
                Título
              </Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='col-span-3'
                required
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Descripción
              </Label>
              <Textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Fecha</Label>
              <div className='col-span-3'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  className='rounded-md border'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='text-right'>
                <Label htmlFor='isAllDay'>Todo el día</Label>
              </div>
              <Switch
                id='isAllDay'
                checked={isAllDay}
                onCheckedChange={setIsAllDay}
              />
            </div>
            {!isAllDay && (
              <>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='startTime' className='text-right'>
                    Hora inicio
                  </Label>
                  <Input
                    id='startTime'
                    type='time'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='endTime' className='text-right'>
                    Hora fin
                  </Label>
                  <Input
                    id='endTime'
                    type='time'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className='col-span-3'
                  />
                </div>
              </>
            )}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='location' className='text-right'>
                Ubicación
              </Label>
              <Input
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='color' className='text-right'>
                Color
              </Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Selecciona un color' />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className='flex items-center gap-2'>
                        <div
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: option.value }}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleClose}>
              Cancelar
            </Button>
            <Button type='submit'>Actualizar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteEventDialog() {
  const {
    selectedEvent,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteEvent,
  } = useEvents()

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id)
      setIsDeleteDialogOpen(false)
    }
  }

  if (!selectedEvent) return null

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Eliminar evento</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este evento? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button type='button' variant='destructive' onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
