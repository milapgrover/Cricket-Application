package com.example.demo.service;
import com.example.demo.entity.Match;
import com.example.demo.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public  class MatchService {
    @Autowired
    private  MatchRepository matchRepository;
    public List<Match> getAllMatches(){return matchRepository.findAll();}
    public  Optional<Match> getMatchById(Long id) {return matchRepository.findById(id);}
    public List<Match> getLiveMatches(){return matchRepository.findLiveMatches();}
    public List<Match> getRecentMatches(){return matchRepository.findRecentMatches();}
    public  List<Match> getUpcomingMatches(){return matchRepository.findUpcomingMatches();}
    public List<Match> getMatchesByTeam(String team){return matchRepository.findMatchesByTeam(team);}
    public List<Match> getMatchesBySeries(String series){return matchRepository.findMatchBySeries(series);}
    public List<Match> getMatchesByFormat(String format){return matchRepository.findMatchesByFormat(format);}

}