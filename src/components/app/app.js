import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search/app-search';
import AppFilter from '../filter/filter';
import PostList from '../postlist/post-list';
import AddPost from '../add-post/add-post';
import './app.css';
import { Button } from 'reactstrap';
import style from 'styled-components';

const AppBlock = style.div `
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
             data: [
                {label: '111', important: false, id:1, like:false},
                {label: '222', important: false, id:2, like:false},
                {label: '333', important: false, id:3, like:false},
                {label: '444', important: true, id:4, like:false},
            ], 
            term: '',
            filter: ''
        };
        this.DeleteItem = this.DeleteItem.bind(this);
        this.AddItem = this.AddItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.MaxId = 6;
    }

    DeleteItem(id) {
        this.setState(({data}) => {
            const Index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, Index), ...data.slice(Index+1)];
            return {
                data: newArr
            };
        });
    }

    AddItem(body) {

        const NewItem = {
            label: body,
            important: true,
            id: this.MaxId++
        };
        this.setState(({data}) => {
            const newArr = [...data, NewItem];
            return {
                data: newArr
            };
        });
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const Index = data.findIndex(item => item.id === id)
            const old = data[Index]
            const NewItem = {...old, important: !old.important}
            const NewArr = [...data.slice(0, Index),NewItem, ...data.slice(Index+1)]
            return {
                data: NewArr
            }
        })
    }



    onToggleLiked(id) {
        this.setState(({data}) => {
            const Index = data.findIndex(item => item.id === id)
            const old = data[Index]
            const NewItem = {...old, like: !old.like}
            const NewArr = [...data.slice(0, Index),NewItem, ...data.slice(Index+1)]
            return {
                data: NewArr
            }
        })
    }

    SearchPost(items, term) {
        if (term === 0) {
            return items
        }
        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
            })
    }

    onUpdateSearch(term){
        this.setState({term})
    }

    FilterPost(items, filter) {
        if (filter === 'like') {
            return items.filter((item => item.like))
    } else {
        return items
    }
    }

    onFilter(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state
        const allPosts = data.length
        const countLiked = data.filter(item => item.like === true).length
        const visiblePosts = this.FilterPost(this.SearchPost(data, term), filter);


    return (
        <AppBlock>
            <AppHeader
            allPosts = {allPosts}
            countLiked = {countLiked}
            />
            <div>
                <SearchPanel
                onUpdateSearch = {this.onUpdateSearch}
                />
            </div>
            <AppFilter
            filter = {filter}
            onFilter = {this.onFilter}
            />
            <PostList 

                posts={visiblePosts}
                onDelete = {this.DeleteItem}
                onToggleImportant = {this.onToggleImportant}
                onToggleLiked = {this.onToggleLiked}
                />
            <AddPost
            AddItem = {this.AddItem}/>
        </AppBlock>
    )
    }
}

