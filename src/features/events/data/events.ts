import { Event } from '../context/events-context'

export const events: Event[] = [
  {
    id: '1',
    title: 'Reunión de facultad',
    description: 'Revisión de objetivos del semestre',
    date: new Date(2025, 0, 15), // 15 de enero de 2025
    startTime: '09:00',
    endTime: '11:00',
    location: 'Sala de conferencias A',
    color: '#4CAF50', // Verde
    isAllDay: false,
  },
  {
    id: '2',
    title: 'Entrega de calificaciones',
    description: 'Fecha límite para enviar calificaciones finales',
    date: new Date(2025, 0, 30), // 30 de enero de 2025
    isAllDay: true,
    color: '#F44336', // Rojo
  },
  {
    id: '3',
    title: 'Orientación a nuevos estudiantes',
    description: 'Sesión de bienvenida para estudiantes de primer año',
    date: new Date(2025, 1, 5), // 5 de febrero de 2025
    startTime: '10:00',
    endTime: '12:30',
    location: 'Auditorio principal',
    color: '#2196F3', // Azul
    isAllDay: false,
  },
  {
    id: '4',
    title: 'Taller de desarrollo profesional',
    description: 'Taller para docentes sobre nuevas metodologías',
    date: new Date(2025, 1, 12), // 12 de febrero de 2025
    startTime: '14:00',
    endTime: '17:00',
    location: 'Sala de capacitación B',
    color: '#9C27B0', // Púrpura
    isAllDay: false,
  },
  {
    id: '5',
    title: 'Cierre de período de inscripciones',
    description: 'Último día para que los estudiantes se inscriban en cursos',
    date: new Date(2025, 1, 20), // 20 de febrero de 2025
    isAllDay: true,
    color: '#FF9800', // Naranja
  },
]
