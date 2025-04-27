import '@tanstack/react-router'
import { LinkProps } from '@tanstack/react-router'

// Extender el tipo 'to' de LinkProps para incluir la ruta '/events'
declare module '@tanstack/react-router' {
  interface LinkProps {
    to:
      | '/'
      | '.'
      | '..'
      | '/settings'
      | '/forgot-password'
      | '/otp'
      | '/sign-in'
      | '/sign-in-2'
      | '/sign-up'
      | '/401'
      | '/403'
      | '/404'
      | '/500'
      | '/503'
      | '/settings/account'
      | '/settings/appearance'
      | '/settings/display'
      | '/settings/notifications'
      | '/apps'
      | '/chats'
      | '/help-center'
      | '/tasks'
      | '/users'
      | '/events' // Agregamos la ruta de eventos
      | (string & {})
      | undefined
  }

  // Extender los parámetros de búsqueda para todas las rutas
  interface Register {
    // Definir los parámetros de búsqueda disponibles para cada ruta
    search: {
      '/sign-in': {
        from?: string
        redirect?: string
      }
      // Agregar otras rutas según sea necesario
      [key: string]: Record<string, string | undefined> | undefined
    }
  }
}
