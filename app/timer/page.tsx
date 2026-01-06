import Sidebar from "../../components/Sidebar";

export default function StudySessionsPage() {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar active="Study Sessions" />
			<main className="flex-1 p-8">
				<h2 className="text-2xl font-semibold mb-4">Study Sessions</h2>
				<p className="text-gray-500">This is the study sessions page.</p>
			</main>
		</div>
	);
}
