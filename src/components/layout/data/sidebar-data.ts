import {
  IconCalendar,
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, GalleryVerticalEnd, GraduationCap } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'University Admin',
      logo: GraduationCap,
      plan: '',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Estudiantes',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: 'Eventos',
          url: '/events',
          icon: IconCalendar,
        },
        {
          title: 'Tareas',
          url: '/tasks',
          icon: IconChecklist,
        },
      ],
    },
  ],
}
