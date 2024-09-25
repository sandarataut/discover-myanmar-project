import Loading from "components/common/Loading";
import { Text } from "components/ui";
import React, { useEffect } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useNotificationViewModel from "viewmodel/NotificationViewModel";
import { Notification as INotification } from "types";

// const data = [
//   "You got new badge!",
//   "You finished level 1 in Myanmar Characters.",
//   "You finished level 1 in Myanmar Numbers."
// ];
export default function NotificationView() {
  const { notifications, loading, getUnreadNotifications } =
    useNotificationViewModel();

  useEffect(() => {
    getUnreadNotifications();
  }, [getUnreadNotifications]);

  const renderItem: ListRenderItem<INotification> = ({
    item
  }: {
    item: INotification;
  }) => (
    <View className="rounded-md py-5 px-6 bg-secondary">
      <Text className="text-base">{item?.message}</Text>
    </View>
  );

  const EmptyView = <Text>No Found data</Text>;

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white px-4">
      <FlatList
        contentContainerClassName="py-5 gap-5"
        data={notifications}
        ListEmptyComponent={EmptyView}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
