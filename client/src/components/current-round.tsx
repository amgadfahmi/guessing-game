import { PlayerConfig } from '../types';

interface CurrentRoundProps {
  round: number;
  players?: PlayerConfig[];
  selfId?: string;
}

const CurrentRound = ({ selfId, round, players }: CurrentRoundProps) => {
  return (
    <div className="overflow-x-auto mx-4 rounded-xl border border-zinc-900 shadow-md">
      <table className="table table-compact table-zebra w-full text-center ">
        <thead>
          <tr className="[&>*]:bg-zinc-900 rounded-xl">
            <th>Name</th>
            <th>Point</th>
            <th>Multiplayer</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, i) => (
            <tr key={i}>
              <td>{player.id === selfId ? 'YOU' : player.name}</td>
              <td>{player.points}</td>
              <td>{player.multiplayer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CurrentRound;
