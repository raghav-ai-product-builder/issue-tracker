import prisma from '@/lib/prisma'

async function getIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })
  return issues
}

export default async function Home() {
  const issues = await getIssues()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{issue.id}</td>
                  <td className="border border-gray-300 px-4 py-2 font-medium">{issue.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{issue.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      issue.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                      issue.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {issue.createdAt.toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {issue.updatedAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
