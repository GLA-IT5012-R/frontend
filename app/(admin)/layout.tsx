
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import AuthGuard from '@/lib/auth/require-auth';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </AuthGuard>
    )
}
