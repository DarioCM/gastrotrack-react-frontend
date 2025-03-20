import { useEffect, useState } from "react";
import "../styles/DailyDietLog.css"; // Import your CSS file

const API_URL = "http://localhost:8085/api/v1/daily-diet-logs";
const TOKEN = localStorage.getItem("token");

interface DailyDietLog {
    id: number;
    date: string;
    typeMeal: string;
    meals: string;
    notes: string;
}

/*
            "id": "d57fe229-5463-4e4b-9e62-8f68208117d8",
            "userId": "2bc8332f-50b1-4f1b-a3ed-0dcae3976a16",
            "date": "2023-10-01",
            "meals": "Chicken",
            "typeMeal": "Dinner",
            "notes": "Feel bad."
*/

const DailyDietLogs = () => {
    const [logs, setLogs] = useState<DailyDietLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const pageSize = 5; 

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_URL}?page=${page}&size=${pageSize}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setLogs(data.content);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [page]);


    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { 
            weekday: "long", // Monday, Tuesday, etc.
            day: "numeric", // 7
            month: "long" // September
        });
    };


    return (
        <div className="content">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && logs.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Meal Type</th>
                                <th>Food Items</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{formatDate(log.date)}</td>
                                    <td>{log.typeMeal}</td>
                                    <td>{log.meals || "No food recorded"}</td>
                                    <td>{log.notes || "No notes"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            className="page-button"
                        >
                            ◀ Previous
                        </button>
                        <span>Page {page + 1}</span>
                        <button
                            onClick={() => setPage(page + 1)}
                            className="page-button"
                        >
                            Next ▶
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DailyDietLogs;