import React, { Component } from 'react';

import './RandomItemComponent.css';

const _delimiter = ',';

class RandomItemComponent extends Component {
    constructor() {
        super();
        this.state = {
            allItemsString: '',
            skipItemsString: '',
            allItems: [],
            skipItems: [],
            availableItems: [],
            chosenItem: '',
        };
    }

    getAvailableItems = (allItems, skipItems) => {
        if (!allItems.length) {
            return [];
        }
        if (!skipItems.length) {
            return allItems.sort();
        }
        // // Sort both arrays first.
        // allItems = allItems.sort();
        // skipItems = skipItems.sort();
        let availableItems = [];
        allItems.forEach((item) => {
            if (!skipItems.includes(item)) {
                availableItems.push(item);
            }
        });
        availableItems.sort();
        return availableItems;
    };

    pickRandom = (items, minIndex=0, maxIndex) => {
        return items[this.pickRandomIndex(items, minIndex, maxIndex)];
    };

    pickRandomIndex = (items, min=0, max1) => {
        const max = max1 || items.length;
        return this.randomNumber(min, max);
    };

    randomNumber = (min, max) => {
        const num = Math.floor(Math.random() * (max - min) + min);
        return num;
    };

    onChangeAllItems = (evt) => {
        this.setState({
            allItemsString: evt.target.value,
        });
        // Need timeout to get updated state values.
        setTimeout(() => {
            this.onChangeItems();
        }, 0);
    };

    onChangeSkipItems = (evt) => {
        this.setState({
            skipItemsString: evt.target.value
        });
        // Need timeout to get updated state values.
        setTimeout(() => {
            this.onChangeItems();
        }, 0);
    };

    onChangeItems = () => {
        const allItems = this.state.allItemsString ? this.state.allItemsString.split(_delimiter) : [];
        const skipItems = this.state.skipItemsString ? this.state.skipItemsString.split(_delimiter) : [];
        const availableItems = this.getAvailableItems(allItems, skipItems);
        this.setState({
            availableItems: availableItems,
            allItems: allItems,
            skipItems: skipItems,
        });
    };

    chooseItem = () => {
        const chosenItem = this.pickRandom(this.state.availableItems, 0,
            this.state.availableItems.length);
        this.setState({
            chosenItem: chosenItem,
        });
    };

    render() {
        return (
            <div className='random-item'>
                <div>All Items String, { _delimiter } delimited ({ this.state.allItems.length })</div>
                <div><textarea value={ this.state.allItemsString } onChange={ this.onChangeAllItems } ></textarea></div>
                <div>Skip Items String, { _delimiter } delimited ({ this.state.skipItems.length })</div>
                <div><textarea value={ this.state.skipItemsString } onChange={ this.onChangeSkipItems } ></textarea></div>
                <div>Available Items ({ this.state.availableItems.length })</div>
                <div>{ this.state.availableItems.join(_delimiter) }</div>
                <button onClick={ this.chooseItem }>Choose Random Item</button>
                <div><b>{ this.state.chosenItem }</b></div>
            </div>
        );
    }
}
export default RandomItemComponent;