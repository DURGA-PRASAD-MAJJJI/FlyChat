import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const Friends = () => {
    const { data: friends = [], isLoading: loadingFriends, refetch } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    const [setIsAddFriendOpen] = useState(false);

    if (loadingFriends) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="loading loading-spinner loading-lg text-primary" />
                <p className="text-lg font-medium text-gray-600">Loading your friends...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Friends</h1>
                <button
                    onClick={() => setIsAddFriendOpen(true)}
                    className="btn btn-primary gap-2"
                >
                    <PlusCircle size={20} />
                    Add Friend
                </button>
            </div>

            {friends.length === 0 ? (
                <NoFriendsFound onAddFriend={() => setIsAddFriendOpen(true)} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {friends.map((friend) => (
                        <FriendCard key={friend._id} friend={friend} />
                    ))}
                </div>
            )}

            {/* <AddFriendModal
        isOpen={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddFriendOpen(false);
        }}
      /> */}
        </div>
    );
};

export default Friends;