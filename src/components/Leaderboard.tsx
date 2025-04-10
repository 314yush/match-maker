import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { usePlayerStats } from '../hooks/usePlayerStats';
import 'nes.css/css/nes.min.css';
import './Leaderboard.css';

interface LeaderboardEntry {
  wallet_address: string;
  email?: string;
  ens_name?: string;
  farcaster_username?: string;
  score: number;
  xp: number;
  position?: number;
}

const Leaderboard = () => {
  const { user } = usePrivy();
  const { getLeaderboard } = usePlayerStats();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch all entries to find user's position
        const allData = await getLeaderboard(true);
        // Fetch top 10 for display
        const topData = await getLeaderboard(false);
        
        if (allData && topData) {
          // Find user's position in the full leaderboard
          if (user?.wallet?.address) {
            const position = allData.findIndex(entry => entry.wallet_address === user?.wallet?.address);
            console.log('User position:', position + 1); // Debug log
            console.log('User wallet:', user.wallet.address); // Debug log
            console.log('Found entry:', allData[position]); // Debug log
            setUserPosition(position !== -1 ? position + 1 : null);
          }

          // Store top 10 entries for display
          setEntries(allData);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [getLeaderboard, user?.wallet?.address]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 8) return email;
    return `${username.slice(0, 6)}...@${domain}`;
  };

  const getDisplayName = (entry: LeaderboardEntry) => {
    // Display priority: Farcaster > ENS > Email > Wallet Address
    if (entry.farcaster_username) return `@${entry.farcaster_username}`;
    if (entry.ens_name) return entry.ens_name;
    if (entry.email) return formatEmail(entry.email);
    return formatAddress(entry.wallet_address);
  };

  // Get entries to display: top 10 and user's position if not in top 10
  const getDisplayEntries = () => {
    const top10 = entries.slice(0, 10);
    
    // Debug logs
    console.log('Current user position:', userPosition);
    console.log('User wallet:', user?.wallet?.address);
    console.log('Total entries:', entries.length);
    
    // If no user is logged in or no position found, just show top 10
    if (!user?.wallet?.address || userPosition === null) {
      return top10;
    }

    // If user is in top 10, just show top 10
    if (userPosition <= 10) {
      return top10;
    }

    // Find user's entry
    const userEntry = entries.find(entry => entry.wallet_address === user?.wallet?.address);
    console.log('Found user entry:', userEntry); // Debug log

    if (!userEntry) {
      console.log('User entry not found in entries array'); // Debug log
      return top10;
    }

    // Return top 10 + separator + user's position
    return [
      ...top10,
      { // Separator entry
        wallet_address: 'separator',
        score: -1,
        xp: -1
      } as LeaderboardEntry,
      {
        ...userEntry,
        position: userPosition // Store the position for display
      }
    ];
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <div className="nes-container is-rounded">
          <h2 className="leaderboard-title nes-text is-primary">Top Players</h2>

          {loading ? (
            <div className="loading-container">
              <span className="nes-text">Loading...</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty-container">
              <span className="nes-text">No entries yet</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="nes-table is-bordered is-centered">
                <thead>
                  <tr>
                    <th className="rank-column">#</th>
                    <th className="player-column">Player</th>
                    <th className="score-column">Score</th>
                    <th className="xp-column">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayEntries().map((entry, index) => {
                    if (entry.wallet_address === 'separator') {
                      return (
                        <tr key="separator" className="separator-row">
                          <td colSpan={4} className="separator-cell">...</td>
                        </tr>
                      );
                    }

                    // Use actual position for user entry when below top 10
                    const displayPosition = entry.position || index + 1;

                    return (
                      <tr 
                        key={entry.wallet_address}
                        className={entry.wallet_address === user?.wallet?.address ? 'current-user-row' : ''}
                      >
                        <td className="rank-column nes-text is-primary">{displayPosition}</td>
                        <td className={`player-column ${entry.wallet_address === user?.wallet?.address ? 'nes-text is-success' : ''}`}>
                          <span className="wallet-address">{getDisplayName(entry)}</span>
                        </td>
                        <td className="score-column nes-text is-primary">{entry.score}</td>
                        <td className="xp-column nes-text is-warning">{entry.xp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 