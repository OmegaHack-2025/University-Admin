import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useEvents } from '../context/events-context'

export function EventsPrimaryButtons() {
  const { setIsCreateDialogOpen } = useEvents()

  return (
    <div className='flex items-center space-x-4'>
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <PlusIcon className='mr-2 h-4 w-4' />
        Nuevo evento
      </Button>
    </div>
  )
}
