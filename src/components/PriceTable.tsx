import './PriceTable.css';

interface PriceTableProps {
  headers: string[];
  rows: string[][];
}

export function PriceTable({ headers, rows }: PriceTableProps) {
  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
