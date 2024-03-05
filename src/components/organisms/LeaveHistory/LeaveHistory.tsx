import React, {useState} from "react";
import {View, Text} from "react-native";
import ClickableIcon from "../../atoms/ClickableIcon";
import DateComponent from "../../molecules/DateComponent/DateComponent";
import DropDetails from "../../molecules/DropDetails/DropDetails";
import {Colors} from "../../../constants/colors";
import leaveHistoryStyles from "./style";
import {leaveStatus} from "../../../constants/leaveItems";

const LeaveHistory = ({
  item,
  handleUpdateLeaveStatus,
  handleDeleteLeave,
  role,
  leaveDuration,
}) => {
  const [fullDetailArray, setFullDetailArray] = useState(false);
  return (
    <View style={leaveHistoryStyles.wrapperContainer}>
      <View style={leaveHistoryStyles.cardComponent}>
        <DateComponent status={item.status} createdDate={item.createdDate} />

        <View style={leaveHistoryStyles.fullSpace}>
          <View style={leaveHistoryStyles.topComponent}>
            <View>
              <View style={leaveHistoryStyles.rowDirection}>
                <Text style={leaveHistoryStyles.infoWrapper}>
                  {item?.leaveReason}
                </Text>

                {role === "Admin" && (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={leaveHistoryStyles.name}>
                    ({item?.user?.name || ""})
                  </Text>
                )}
              </View>

              <Text style={leaveHistoryStyles.dateStyle}>
                {new Date(item?.startDate.toDate()).toLocaleDateString()}-
                {new Date(item?.endDate.toDate()).toLocaleDateString()}
              </Text>
            </View>

            <ClickableIcon
              type="font-awesome"
              size={24}
              name={fullDetailArray ? "chevron-up" : "chevron-down"}
              color={Colors.cyan500}
              onPress={() => setFullDetailArray(!fullDetailArray)}
            />
          </View>

          {role === "Admin" && item.status === "Pending" && (
            <View style={leaveHistoryStyles.adminActionPending}>
              <ClickableIcon
                onPress={() =>
                  handleUpdateLeaveStatus(
                    item.leaveId,
                    leaveStatus.Accept,
                    item?.user?.deviceToken,
                    item?.startDate,
                    item?.endDate,
                  )
                }
                type="material"
                name="check"
                size={27}
                color={Colors.green}
              />

              <View style={leaveHistoryStyles.dividerVertical} />

              <ClickableIcon
                onPress={() =>
                  handleUpdateLeaveStatus(
                    item.leaveId,
                    leaveStatus.Reject,
                    item?.user?.deviceToken,
                  )
                }
                type="material"
                name="close"
                size={24}
                color={Colors.red}
              />
            </View>
          )}

          {role === "Admin" && item.status === "Reject" && (
            <Text style={leaveHistoryStyles.adminActionReject}>
              You have already rejected the leave.
            </Text>
          )}

          {role === "Employee" && (
            <>
              {item.status === "Pending" && (
                <ClickableIcon
                  onPress={() => handleDeleteLeave(item.leaveId)}
                  type="font-awesome"
                  name="trash"
                  size={24}
                  color={Colors.red}
                  style={leaveHistoryStyles.employeePending}
                />
              )}

              {item.status === "Reject" && (
                <Text style={leaveHistoryStyles.employeeReject}>
                  Sorry, but your request has been declined.
                </Text>
              )}
            </>
          )}
        </View>
      </View>

      {fullDetailArray && (
        <>
          <View style={leaveHistoryStyles.dividerHorizontal} />
          <View>
            <DropDetails
              label="Duration:"
              value={`${leaveDuration(item.endDate, item.startDate)} days`}
            />
            <DropDetails label="Type:" value={item.leaveType} />
            <DropDetails label="Notes:" value={item.reason} />
          </View>
        </>
      )}
    </View>
  );
};

export default LeaveHistory;
