package es.eoi.humillator1000.service.impl;

import es.eoi.humillator1000.domain.UserHasMatch;
import es.eoi.humillator1000.repository.UserHasMatchRepository;
import es.eoi.humillator1000.service.UserHasMatchService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UserHasMatch}.
 */
@Service
@Transactional
public class UserHasMatchServiceImpl implements UserHasMatchService {

    private final Logger log = LoggerFactory.getLogger(UserHasMatchServiceImpl.class);

    private final UserHasMatchRepository userHasMatchRepository;

    public UserHasMatchServiceImpl(UserHasMatchRepository userHasMatchRepository) {
        this.userHasMatchRepository = userHasMatchRepository;
    }

    @Override
    public UserHasMatch save(UserHasMatch userHasMatch) {
        log.debug("Request to save UserHasMatch : {}", userHasMatch);
        return userHasMatchRepository.save(userHasMatch);
    }

    @Override
    public UserHasMatch update(UserHasMatch userHasMatch) {
        log.debug("Request to save UserHasMatch : {}", userHasMatch);
        return userHasMatchRepository.save(userHasMatch);
    }

    @Override
    public Optional<UserHasMatch> partialUpdate(UserHasMatch userHasMatch) {
        log.debug("Request to partially update UserHasMatch : {}", userHasMatch);

        return userHasMatchRepository
            .findById(userHasMatch.getId())
            .map(existingUserHasMatch -> {
                if (userHasMatch.getIsOwner() != null) {
                    existingUserHasMatch.setIsOwner(userHasMatch.getIsOwner());
                }
                if (userHasMatch.getMark() != null) {
                    existingUserHasMatch.setMark(userHasMatch.getMark());
                }

                return existingUserHasMatch;
            })
            .map(userHasMatchRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserHasMatch> findAll(Pageable pageable) {
        log.debug("Request to get all UserHasMatches");
        return userHasMatchRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserHasMatch> findOne(Long id) {
        log.debug("Request to get UserHasMatch : {}", id);
        return userHasMatchRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserHasMatch : {}", id);
        userHasMatchRepository.deleteById(id);
    }
}
