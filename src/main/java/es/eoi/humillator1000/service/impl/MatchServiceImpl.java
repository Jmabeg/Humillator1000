package es.eoi.humillator1000.service.impl;

import es.eoi.humillator1000.domain.Match;
import es.eoi.humillator1000.repository.MatchRepository;
import es.eoi.humillator1000.service.MatchService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Match}.
 */
@Service
@Transactional
public class MatchServiceImpl implements MatchService {

    private final Logger log = LoggerFactory.getLogger(MatchServiceImpl.class);

    private final MatchRepository matchRepository;

    public MatchServiceImpl(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @Override
    public Match save(Match match) {
        log.debug("Request to save Match : {}", match);
        return matchRepository.save(match);
    }

    @Override
    public Match update(Match match) {
        log.debug("Request to save Match : {}", match);
        return matchRepository.save(match);
    }

    @Override
    public Optional<Match> partialUpdate(Match match) {
        log.debug("Request to partially update Match : {}", match);

        return matchRepository
            .findById(match.getId())
            .map(existingMatch -> {
                if (match.getStartingDate() != null) {
                    existingMatch.setStartingDate(match.getStartingDate());
                }
                if (match.getEndingDate() != null) {
                    existingMatch.setEndingDate(match.getEndingDate());
                }
                if (match.getDescription() != null) {
                    existingMatch.setDescription(match.getDescription());
                }
                if (match.getTitle() != null) {
                    existingMatch.setTitle(match.getTitle());
                }
                if (match.getDelete() != null) {
                    existingMatch.setDelete(match.getDelete());
                }

                return existingMatch;
            })
            .map(matchRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Match> findAll(Pageable pageable) {
        log.debug("Request to get all Matches");
        return matchRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Match> findOne(Long id) {
        log.debug("Request to get Match : {}", id);
        return matchRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Match : {}", id);
        matchRepository.deleteById(id);
    }
}
