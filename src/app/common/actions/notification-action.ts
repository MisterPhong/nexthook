'use server'

import { httpClient } from '../services/httpClient'
import { Notification } from '../types/notification.type'
import { server } from '../constant/server'

export async function notificationsAction(): Promise<Notification> {
    const response = await httpClient.get<Notification>(server.notification)
    return response.data
}

export async function notificationIsReadAction(): Promise<void> {
    await httpClient.patch<void>(server.notification)
}

export async function notificationDelete(id: string): Promise<void> {
    await httpClient.delete<void>(`${server.notification}/${id}`)
}
