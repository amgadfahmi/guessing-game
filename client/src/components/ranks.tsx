import { Rank } from '../types';

interface RanksProps {
  ranks: Rank[];
  selfName?: string;
}

const Ranks = ({ ranks, selfName }: RanksProps) => {
  return (
    <div className="overflow-x-auto mx-4 rounded-xl border border-zinc-900 shadow-md">
      <table className="table table-compact table-zebra w-full  text-center">
        <thead>
          <tr className="[&>*]:bg-zinc-900">
            <th>No.</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {ranks?.map((rank, i) => (
            <tr
              key={i}
              className={
                i === 0 && rank.score > 0 ? `text-green-700 font-bold` : ''
              }
            >
              <td>{i + 1}</td>
              <td>{rank.playerName === selfName ? 'YOU' : rank.playerName}</td>
              <td>{rank.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Ranks;
