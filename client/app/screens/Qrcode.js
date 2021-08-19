import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function Qrcode() {
  return (
    <View style={styles.scrollViewStyle}>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.textTitle}>
          Welcome To React-Native QR Code Tutorial !
        </Text>
        {!scan && !ScanResult && (
          <View style={styles.cardView}>
            <Text numberOfLines={8} style={styles.descText}>
              {desccription}
            </Text>

            <TouchableOpacity
              onPress={this.activeQR}
              style={styles.buttonTouchable}
            >
              <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
            </TouchableOpacity>
          </View>
        )}

        {ScanResult && (
          <Fragment>
            <Text style={styles.textTitle1}>Result !</Text>
            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Text>Type : {result.type}</Text>
              <Text>Result : {result.data}</Text>
              <Text numberOfLines={1}>RawData: {result.rawData}</Text>
              <TouchableOpacity
                onPress={this.scanAgain}
                style={styles.buttonTouchable}
              >
                <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}

        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => {
              this.scanner = node;
            }}
            onRead={this.onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Go to{' '}
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
                on your computer and scan the QR code to test.
              </Text>
            }
            bottomContent={
              <View>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => this.scanner.reactivate()}
                >
                  <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => this.setState({ scan: false })}
                >
                  <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </Fragment>
    </View>
  );
}

const styles = StyleSheet.create({});
