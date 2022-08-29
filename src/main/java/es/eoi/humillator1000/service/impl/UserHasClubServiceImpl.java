package es.eoi.humillator1000.service.impl;

import es.eoi.humillator1000.domain.UserHasClub;
import es.eoi.humillator1000.repository.UserHasClubRepository;
import es.eoi.humillator1000.service.UserHasClubService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UserHasClub}.
 */
@Service
@Transactional
public class UserHasClubServiceImpl implements UserHasClubService {

    private final Logger log = LoggerFactory.getLogger(UserHasClubServiceImpl.class);

    private final UserHasClubRepository userHasClubRepository;

    public UserHasClubServiceImpl(UserHasClubRepository userHasClubRepository) {
        this.userHasClubRepository = userHasClubRepository;
    }

    @Override
    public UserHasClub save(UserHasClub userHasClub) {
        log.debug("Request to save UserHasClub : {}", userHasClub);
        return userHasClubRepository.save(userHasClub);
    }

    @Override
    public UserHasClub update(UserHasClub userHasClub) {
        log.debug("Request to save UserHasClub : {}", userHasClub);
        return userHasClubRepository.save(userHasClub);
    }

    @Override
    public Optional<UserHasClub> partialUpdate(UserHasClub userHasClub) {
        log.debug("Request to partially update UserHasClub : {}", userHasClub);

        return userHasClubRepository
            .findById(userHasClub.getId())
            .map(existingUserHasClub -> {
                if (userHasClub.getRating() != null) {
                    existingUserHasClub.setRating(userHasClub.getRating());
                }

                return existingUserHasClub;
            })
            .map(userHasClubRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserHasClub> findAll(Pageable pageable) {
        log.debug("Request to get all UserHasClubs");
        return userHasClubRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserHasClub> findOne(Long id) {
        log.debug("Request to get UserHasClub : {}", id);
        return userHasClubRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserHasClub : {}", id);
        userHasClubRepository.deleteById(id);
    }
}
