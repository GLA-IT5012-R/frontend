
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

// import Sidebar from '@/components/admin/Slidebar';
// import Header from '@/components/admin/Header';


// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex h-screen bg-slate-100">
//       {/* 左侧 */}
//       <Sidebar />

//       {/* 右侧 */}
//       <div className="flex flex-1 flex-col">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }