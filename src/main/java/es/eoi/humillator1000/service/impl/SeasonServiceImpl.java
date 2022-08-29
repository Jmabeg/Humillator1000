package es.eoi.humillator1000.service.impl;

import es.eoi.humillator1000.domain.Season;
import es.eoi.humillator1000.repository.SeasonRepository;
import es.eoi.humillator1000.service.SeasonService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Season}.
 */
@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    private final Logger log = LoggerFactory.getLogger(SeasonServiceImpl.class);

    private final SeasonRepository seasonRepository;

    public SeasonServiceImpl(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    @Override
    public Season save(Season season) {
        log.debug("Request to save Season : {}", season);
        return seasonRepository.save(season);
    }

    @Override
    public Season update(Season season) {
        log.debug("Request to save Season : {}", season);
        return seasonRepository.save(season);
    }

    @Override
    public Optional<Season> partialUpdate(Season season) {
        log.debug("Request to partially update Season : {}", season);

        return seasonRepository
            .findById(season.getId())
            .map(existingSeason -> {
                if (season.getName() != null) {
                    existingSeason.setName(season.getName());
                }
                if (season.getStartingDate() != null) {
                    existingSeason.setStartingDate(season.getStartingDate());
                }
                if (season.getEndingDate() != null) {
                    existingSeason.setEndingDate(season.getEndingDate());
                }

                return existingSeason;
            })
            .map(seasonRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Season> findAll(Pageable pageable) {
        log.debug("Request to get all Seasons");
        return seasonRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Season> findOne(Long id) {
        log.debug("Request to get Season : {}", id);
        return seasonRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Season : {}", id);
        seasonRepository.deleteById(id);
    }
}
