import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PokemonGrid from './containers/pokemon-grid/PokemonGrid';
import TextField from '@material-ui/core/TextField';

const URL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      filteredPokemon:[],
      searchValue: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    axios.get(URL)
      .then(res => {
        const pokemon = res.data.pokemon;
        this.setState({ 
          pokemon: pokemon,
          filteredPokemon: pokemon
        });
      })
  }

  onInputChange(e) {
    let pokemon = [...this.state.pokemon];
    pokemon = pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(e.target.value.toLowerCase().trim()));
    this.setState({
      filteredPokemon: pokemon,
      searchValue: e.target.value
    })
  }

  render() {
    return (
      <AppContainer>
        <Header />
        <SearchContainer>
          <TextField
            id="outlined-basic"
            label="Enter a Pokémon name"
            variant="outlined"
            size='medium'
            fullWidth
            onChange={this.onInputChange}
            value={this.state.searchValue}
          />
        </SearchContainer>
        <PokemonGrid
          pokemon={this.state.filteredPokemon}
        />
        <Footer />
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  max-width: 98%;
  max-height: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  margin-top: 4%;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items:center;
  width: 40%;
`;

export default App;
