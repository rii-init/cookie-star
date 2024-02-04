// Now YOU can be opinionated too!
// This is the config file for the generation and organisation of your static site.
// These options can be specified in the config.json file in the generator directory.

package model

type Config struct {
	CapitaliseSmolTitles                 bool `json:"capitalise_smol_titles"`
	CapitaliseSmolTitlesUnderNCharacters int  `json:"capitalise_smol_titles_under_n_characters"`
}
