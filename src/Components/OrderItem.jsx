import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { colors } from "../Global/Colors";

const OrderItem = ({ order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {order.updatedAt}
                </Text>
                <Text style={styles.text2}>${total}</Text>
            </View>
            <Feather name="search" size={30} color="white" />
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.color1,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 17,
        color: "#fff",
    },
    text2: {
        fontSize: 19,
        color: "#aaa",
    },
});