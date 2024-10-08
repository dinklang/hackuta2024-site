import { headers } from 'next/headers'
import { getEnhancedSession } from '@/lib/utils/server'
import { AdminNavBar } from './AdminNav'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { perms } = getEnhancedSession(headers())
    return (
        <div>
            <div
                className={
                    'flex flex-col content-center bg-white bg-opacity-10 lg:flex-row'
                }
            >
                {/* <aside className="flex border-r border-r-[#3a3a3a] bg-gradient-to-b from-[#1a1a1a] to-[#2c2c2c] px-4 py-6 sm:flex-col sm:gap-4 sm:py-5"> */}
                <aside className="flex lg:border-r lg:border-r-[#3a3a3a] px-4 py-6 items-center sm:flex-col sm:gap-4 sm:py-5">
                    <AdminNavBar perms={perms} />
                </aside>
                <main className="mx-auto text-white p-8">{children}</main>
            </div>
        </div>
    )
}
