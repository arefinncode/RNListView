import React from 'react';
import Expo from 'expo';
import { ListView, View } from 'react-native';
import { List, ListItem, Container, Content, Header, Title, Body, Text } from 'native-base';
export default class Application extends React.Component {
    constructor(){
        super();
        this.state= {
            isReady: false,
            dataSource : new ListView.DataSource({
                rowHasChanged           : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            })
        };
    }
    populateList() {
        this.setState({
            dataSource : this.state.dataSource.cloneWithRowsAndSections([
                ["Movies","Prestige","Interstellar","Dark Knight", "Neighbours"],
                ["Music","Nirvana", "Imagine Dragons", "Avicii","Maya"],
                ["Places","Agra","Jamshedpur","Delhi", "Bangalore"],
                ["Things","Car","Table","Fan", "Chair"],
                ["People","Sankho","Aditya","Himanshu", "Kuldeep"],
                ["Roads","NH-11","MG Road","Brigade Road", "Nehru Road"],
                ["Buildings","Empire State","Burj Khalifa","Caspian", "Narnia"]
            ])
        });
    }
    async componentWillMount() {
        this.populateList();
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({isReady: true});
    }
    renderSectionHeader(sectionData, sectionID) {
        return (
            <ListItem >
                <Text>{sectionData[0]}</Text>
            </ListItem>
        );
    }
    renderRow(rowData, sectionID, rowID) {
        console.log(rowID,rowData,sectionID, "renderRow");
        if(rowID == 0){
            console.log(rowData, "0 rowId");
            return null;
        }
        return (
            <ListItem>
                <Text>{rowData}</Text>
            </ListItem>
        );
    }
    render() {
        if (!this.state.isReady) {
            // return <Expo.AppLoading />;

            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Sticky Headers</Title>
                    </Body>
                </Header>
                <List
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </Container>
        );
    }
}